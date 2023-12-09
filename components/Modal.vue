<template>
  <div class="modal" v-if="isOpen">
    <div class="modal-overlay" v-on:click="$emit('closeModal')"></div>
    <div class="modal-container">
      <div class="modal-header">
        <h3 class="modal-title">
          <slot name="title">
            Modal Title
          </slot>
        </h3>
        <button class="close-button" v-on:click="$emit('closeModal')">
          <Icon name="mdi:close"></Icon>
        </button>
      </div>
      <div class="modal-body">
        <slot>
          <p>Modal Content</p>
        </slot>
      </div>
      <div class="modal-footer" v-if="slots.footer">
        <slot name="footer">
          <button class="button button-outline mr-4">Cancel</button>
          <button class="button">OK</button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps(['isOpen']);
  const emit = defineEmits(['closeModal']);
  const slots = useSlots();

  useHead({
    bodyAttrs: {
      class: computed(() => props.isOpen ? 'modal-open' : '')
    },
  })
</script>

<style>
  body.modal-open {
    overflow: hidden;
  }
</style>

<style scoped>
  .modal {
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    overflow-y: scroll;
    z-index: 101;
  }

  .modal-overlay {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: white;
    opacity: .4;
  }

  .modal-container {
    position: relative;
    top: 10%;
    left: 50%;
    transform: translate(-50%, 0%);
    background-color: white;
    border-radius: 5px;
    padding: 20px;
    width: 80%;
    border: 1px solid #ccc;
    overflow: hidden;
    margin-bottom: 20%;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 15px;
  }

  .modal-title {
    margin: 0;
  }

  .modal-body {
  }

  .modal-footer {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }

  .close-button {
    background: none;
    border: none;
    color: #ccc;
    font-size: 2em;
    padding-right: 0;
  }

  .close-button:hover {
    color: #999;
  }

  .modal-footer .button {
    margin-bottom: 0;
  }
</style>
