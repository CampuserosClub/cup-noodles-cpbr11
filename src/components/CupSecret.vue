<template>
  <div class="row text-center border-top pt-3">
    <div class="col-md-12" v-if="!paused">
      <qrcode-reader
        @decode="onDecode"
        :paused="paused"
        :video-constraints="video"/>
    </div>
    <div class="col-md-12" v-else>
      <div v-if="campaign.active">
        O dígito <span class="badge badge-dark">{{ campaign.order }} / 4</span> da senha do cofre é:<br/><br/>
        <span class="badge badge-dark badge-big">{{ campaign.secret }}</span><br/><br/>
        <span v-if="campaign.order === 4">Vá correndo para abrir o cofre e pegar sua recompensa!</span>
        <span v-else>Acompanhe o nosso twitter para achar os outros dígitos :D</span>
      </div>
      <div v-else>
        Ops!<br/>Outra pessoa conseguiu a senha antes de você.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      paused: false,
      campaign: null,
      video: {
        facingMode: { ideal: 'environment' },
        width: { ideal: 300 },
        height: { ideal: 300 }
      }
    }
  },
  methods: {
    onDecode (content) {
      this.$db.collection('campaigns').doc(content).get().then(campaign => {
        if (!campaign.exists) return alert('QR code inválido')

        this.paused = true
        this.campaign = campaign.data()
      })
    }
  }
}
</script>

<style>
.badge-big {
  font-size: 5em;
  letter-spacing: 10px;
  padding: 1rem 1rem!important;
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
