<template>
  <div class="container text-uppercase">
    <cup-header/>
    <cup-secret/>
  </div>
</template>

<script>
import CupHeader from './CupHeader'
import CupSecret from './CupSecret'

export default {
  components: { CupHeader, CupSecret }
}
</script>
