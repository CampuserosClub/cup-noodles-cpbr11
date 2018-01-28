<template>
  <div class="row text-center border-top pt-3">
    <div class="col-md-12" v-if="!paused">
      <qrcode-reader
        @decode="onDecode"
        :paused="paused"
        :video-constraints="video"/>
    </div>
    <div class="col-md-12" v-else>
      O dígito <span class="badge badge-dark">{{ secret.current }} / {{ total }}</span> do cofre é:<br/><br/>
      <span class="badge badge-dark badge-big">{{ secret.key }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      paused: false,
      hash: null,
      total: 4,
      secret: {
        current: 1,
        key: 5
      },
      video: {
        facingMode: { ideal: 'environment' },
        width: { ideal: 300 },
        height: { ideal: 300 }
      }
    }
  },
  methods: {
    onDecode (content) {
      console.log(content)
      if (content === 'hash-unico') {
        this.paused = true
        this.hash = content
      } else {
        alert('qr code invalido, tente novamente')
      }
    }
  }
}
</script>

<style>
.badge-big {
  font-size: 10em;
  padding: 1rem 3rem!important;
  border-radius: 1rem;
}
.qrcode-reader {
  background: #000;
}
.qrcode-reader__camera {
  display: flex;
  margin-left: auto;
  margin-right: auto;
}
</style>
