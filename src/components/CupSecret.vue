<template>
  <div class="row text-center border-top pt-3">
    <div class="col-md-12" v-if="error">
      Ops!
      <br/>Não conseguimos identificar a sua câmera.<br/>
      Vá nas configurações do seu navegador e permita o acesso.<br/><br/>
      Ou, use um leitor de QR code externo:<br/><br/>
      <form @submit.prevent="submit">
        <input type="text" placeholder="Cole ou digite o QR code aqui" class="form-control" v-model="qrCode"/><br/>
        <button type="submit" class="btn badge-dark">ok</button>
      </form>
    </div>
    <div class="col-md-12" v-else>
      <div class="col-md-12" v-if="allowed">
        <div v-if="!paused">
          <qrcode-reader
            @init="onInit"
            @decode="onDecode"
            :paused="paused"
            :video-constraints="video"/>
        </div>
        <div v-else>
          <div v-if="campaign.active">
            O dígito <span class="badge badge-dark">{{ campaign.order }} / 4</span> da senha do cofre é:<br/><br/>
            <span class="badge badge-dark badge-big">{{ campaign.secret }}</span><br/><br/>
            <span v-if="campaign.order === 4">Vá correndo para abrir o cofre e pegar sua recompensa!</span>
            <span v-else>
              Acompanhe o nosso twitter para achar os outros dígitos<br/><br/>
              <a href="https://twitter.com/CupNoodles_BR" target="_blank" class="badge badge-dark">@CupNoodles_BR</a>
            </span>
          </div>
          <div v-else>
            Ops!<br/>Outra pessoa conseguiu a senha antes de você.
          </div>
        </div>
      </div>
      <div class="col-md-12" v-else>
        Olá c@mpusero!<br/><br/>
        Já achou algum QR code? Se sim, basta clicar no botão abaixo para descobrir um dos dígitos do cofre.<br/><br/>
        <button type="button" class="btn btn-default badge-dark" @click.prevent="allowed = true">LER QR CODE</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      paused: false,
      allowed: false,
      campaign: null,
      error: false,
      qrCode: '',
      video: {
        facingMode: { ideal: 'environment' },
        width: { ideal: 300 },
        height: { ideal: 300 }
      }
    }
  },
  methods: {
    async onInit (promise) {
      try {
        await promise
      } catch (error) {
        this.paused = true
        this.error = true
      }
    },
    onDecode (content) {
      this.$db.collection('campaigns').doc(content).get().then(campaign => {
        if (!campaign.exists) return alert('QR code inválido')

        this.paused = true
        this.campaign = campaign.data()
      })
    },
    submit () {
      this.error = false
      this.paused = true
      this.onDecode(this.qrCode)
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
