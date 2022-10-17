import { Component } from "vue"

declare module 'vue' {
  interface ComponentCustomProperties extends Component {
    $filters: any
  }
}