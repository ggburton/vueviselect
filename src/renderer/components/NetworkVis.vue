<template>
  <div>
    <div id="network"></div>
  </div>
</template>

<script>
import vis from 'vis/dist/vis.js'

export default {
  name: 'network-vis',
  data () {
    return {
      network: {},
      nodes: [],
      edges: [],
      selected: null,
      options: {
        nodes: {
          font: {
            color: 'white',
            size: 18
          }
        },
        groups: {
          online: {
            shape: 'image',
            image: 'static/switch.png'
          },
          offline: {
            shape: 'image',
            image: 'static/switchOffline.png'
          }
        }
      },
      container: '',
      disabled: false
    }
  },
  methods: {
    updateVis () {
      window.network.setData({ nodes: this.nodes, edges: this.edges })
    },
    buildNode (nodeData) {
      var image = ''
      nodeData.online === true ? image = 'online' : image = 'offline'
      const node = {
        id: nodeData.id,
        label: nodeData.name,
        group: image
      }
      return node
    },
    addNodesAndEdges (data) {
      data.forEach(item => {
        const node = this.buildNode(item)
        this.nodes.push(node)
        if (item.parent !== null) {
          const edge = {
            from: item.id,
            to: item.parent
          }
          this.edges.push(edge)
        }
      })
      this.updateVis()
    },
    setActiveSwitch (event) {
      if (event.nodes[0] !== undefined) {
        console.log(event.nodes[0])
        this.selected = event.nodes[0]
        this.$emit('setCurrent', this.selected)
      }
    },
    getSchema () {
      this.$client.get('http://localhost:8000/api/').then(data => {
        this.$store.commit('setSchema', {schema: data})
        this.$client.action(this.$store.state.Schema.schema, ['switch', 'list']).then(this.addNodesAndEdges)
        console.log('nodes added')
      }).catch(err => {
        console.error('could not get schema', err)
      })
    }
  },
  mounted () {
    console.log('mounted called')
    this.getSchema()
    this.container = document.getElementById('network')
    let data = {
      nodes: this.nodes,
      edges: this.edges
    }
    window.network = new vis.Network(this.container, data, this.options)

    window.network.on('click', this.setActiveSwitch)
    this.$bridge.demultiplex('switch', (response) => {
      console.log(response.data)
      response.data.id = response.pk
      const newNode = this.buildNode(response.data)
      var nodeIndex = this.nodes.findIndex(node => node.id === response.pk)

      this.$set(this.nodes, nodeIndex, newNode)
      this.updateVis()
    })
    if (this.$store.state.Schema.schema === 'undefined') {
      console.log('call again')
      this.getSchema()
    } else {
      console.log('schema :', this.$store.state.Schema.scema)
    }
    this.updateVis()
  }

}
</script>

<style>

  #network {
    height: 450px;
    width: 500px;
    border: 3px solid #9d0000;
    border-radius: 5px;
    background-color: #303030;
    color: white;
  }
</style>
