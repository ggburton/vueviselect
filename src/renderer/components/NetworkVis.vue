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
    fetchAllSwitchData () {
      this.$client.action(this.schema, ['switch', 'list']).then(data => {
        console.log('found this: ', data)
      })
      this.$http.get('http://localhost:8000/api/switch/').then(response => {
        response.data.forEach(function (element) {
          var image = ''
          if (element.online === true) {
            image = 'online'
          } else {
            image = 'offline'
          }
          const node = {
            id: element.id,
            label: element.name,
            group: image
          }
          this.nodes.push(node)
          if (element.parent !== null) {
            const edge = {
              from: element.id,
              to: element.parent
            }
            this.edges.push(edge)
          }
        }, this)
        this.updateVis()
      }).catch(err => {
        console.error(err)
      })
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
    this.$client.get('http://localhost:8000/api').then(data => {
      this.schema = data
      console.log(this.schema)
    })
    this.container = document.getElementById('network')
    let data = {
      nodes: this.nodes,
      edges: this.edges
    }
    window.network = new vis.Network(this.container, data, this.options)
    this.fetchAllSwitchData()

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
