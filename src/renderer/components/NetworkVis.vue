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
    addNodesAndEdges (data) {
      data.forEach(item => {
        var image = ''
        item.online === true ? image = 'online' : image = 'offline'
        const node = {
          id: item.id,
          label: item.name,
          group: image
        }
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
    }
  },
  mounted () {
    this.$client.get('http://localhost:8000/api/').then(data => {
      this.$store.commit('setSchema', {schema: data})
      this.$client.action(this.$store.state.Schema.schema, ['switch', 'list']).then(this.addNodesAndEdges)
    }).catch(err => {
      console.error('could not get schema', err)
    })
    this.container = document.getElementById('network')
    let data = {
      nodes: this.nodes,
      edges: this.edges
    }
    window.network = new vis.Network(this.container, data, this.options)

    window.network.on('click', this.setActiveSwitch)
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
