<template>
  <div class="row">
    <div class="col-md-12 text-center border-top pt-3">
      O dígito <span class="badge badge-dark">{{ secret.current }} / {{ total }}</span> do cofre é:<br/><br/>
      <span class="badge badge-dark badge-big">{{ secret.key }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      total: 4,
      secret: {
        current: 1,
        key: 5
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
</style>
