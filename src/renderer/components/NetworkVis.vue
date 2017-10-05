<template>
  <div>
    <div id="network"></div>
  </div>
</template>

<script>
import vis from 'vis/dist/vis.js'
import axios from 'axios'

export default {
  name: 'network-vis',
  data () {
    return {
      network: {},
      nodes: [],
      edges: [],
      selected: null,
      options: {
        groups: {
          online: {
            shape: 'image',
            image: 'static/switch.png'
          },
          offline: {
            shape: 'image',
            image: 'static/switchOffine.png'
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
      axios.get('http://172.16.5.253:8000/api/switch/').then(response => {
        response.data.forEach(function (element) {
          const node = {
            id: element.id,
            label: element.name,
            group: 'online'
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
      }
    }
  },
  mounted () {
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
    width: 50%;
    height: 450px;
    border: 1px solid black;
    background-color: white;
  }
</style>
