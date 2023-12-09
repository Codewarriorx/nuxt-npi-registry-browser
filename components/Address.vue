<template>
  <div>
    <span class="block">{{ address.address_1 }}</span>
    <span class="block">{{ address.address_2 }}</span>
    {{ address.city }},
    {{ address.state }}
    {{ address.postal_code.substring(0, 5) + '-' + address.postal_code.substring(5) }}
    <span class="block">{{ address.country_name }}</span>

    <span class="block">
      <template v-if="address.telephone_number">
        Phone: {{ address.telephone_number }}
      </template>
      <template v-if="address.fax_number">
        Fax: {{ address.fax_number }}
      </template>
    </span>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps(['address'])
</script>

<style scoped>

</style>
