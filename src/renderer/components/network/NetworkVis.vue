<template>
  <div>
    <div id="network"></div>
  </div>
</template>

<script>
import vis from 'vis/dist/vis.js'
import { useClient } from '../../api/core'
import { webSocketBridge } from '../../api/websocket'

export default {
  name: 'network-vis',
  data () {
    return {
      selected: null,
      options: {
        nodes: {
          font: {
            color: 'black',
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
        this.$store.dispatch('append_node', node)
        if (item.parent !== null) {
          const edge = {
            from: item.id,
            to: item.parent
          }
          this.$store.dispatch('append_edge', edge)
        }
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
    this.$store.dispatch('clear_nodes')
    useClient(['switch', 'list'])
      .then(this.addNodesAndEdges)
    this.container = document.getElementById('network')
    let data = {
      nodes: null,
      edges: null
    }
    window.network = new vis.Network(this.container, data, this.options)

    window.network.on('click', this.setActiveSwitch)
    webSocketBridge.demultiplex('switch', (response) => {
      // because the id is in the response not the response data????????????
      response.data.id = response.pk
      console.log(response.data)
      const newNode = this.buildNode(response.data)
      this.$store.dispatch('update_node', newNode)
    })
    this.$store.watch((this.$store.getters.getNetwork, () => {
      var network = this.$store.getters.getNetwork
      window.network.setData({nodes: network.nodes, edges: network.edges})
    }))
  }

}
</script>

<style>
  #network {
    height: 450px;
    width: 500px;
    border: 3px solid black;
    border-radius: 5px;
    color: white;
  }
</style>
