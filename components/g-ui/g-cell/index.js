// components/g-ui/g-cell/index.js
Component({
    properties:{
      label:String,
      desc:String,
      access:Boolean,
      disabled:{
        type:Boolean,
        value:false
      }
    },
    data:{},
    methods:{
      handleTap(e){
      if(!this.properties.disabled){
        this.triggerEvent('tap', e.detail);
      }
      }
    }
    
 
})