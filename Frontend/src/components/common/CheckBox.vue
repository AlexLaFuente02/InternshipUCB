<template>
    <div class="container__radio">
      <label v-for="option in options" :key="option" class="checkbox">
        <input
          type="radio"
          :value="option"
          v-model="selectedOption"
          :id="option"
          :name="radioGroupName"
          @change="emitSelection"
          :checked="option === initOption"
        />
        {{ option }}
      </label>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      options: {
        type: Array,
        required: true,
      },
      initOption: {
        type: String,
        required: false,
      },
    },
    data() {
      return {
        selectedOption: null,
        radioGroupName: 'myRadioGroup',
      };
    },
    methods: {
      emitSelection() {
        this.$emit("selected", this.selectedOption);
      },
    },
    watch: {
      initOption: {
        immediate: true,
        handler(value) {
          this.selectedOption = value;
        },
      },
    },
  };
  </script>
  
  <style scoped>

    .container__radio {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    .checkbox {
  margin-right: 1rem;
  padding-left: 1.75rem;
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.checkbox input[type="checkbox"] {
  position: absolute;
  opacity: 0;
}

.checkbox input[type="checkbox"]:focus ~ span {
  border: 2px solid lighten(var(--black), 50%);
}

.checkbox input[type="checkbox"]:focus:checked ~ span {
  border: 2px solid darken(var(#3785BC), 15%);
}

.checkbox input[type="checkbox"]:checked ~ span {
  color: var(--white);
  background: var(#3785BC) url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnIHdpZHRoPSIxMiIgaGVpZ2h0PSI5IiB2aWV3Qm94PSIwIDAgMTIgOSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCiAgPHBhdGggZD0iTTQuNTc1IDguOTc3cy0uNDA0LS4wMDctLjUzNi0uMTY1TC4wNTcgNS42NGwuODI5LTEuMjI3TDQuNDcgNy4yNjggMTAuOTIxLjA4NmwuOTIzIDEuMTAzLTYuODYzIDcuNjRjLS4eMzQtLjAwMy0uNDA2LjE0OC0uNDA2LjE0OHoiIGZpbGw9IiNGRkYiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPgDQoPC9zdmc+) 50% 40% no-repeat;
  border: 2px solid var(#3785BC);
}

.checkbox span {
  border-radius: 3px;
  position: absolute;
  left: 0;
  top: -2px;
  width: 1rem;
  height: 1rem;
  background-color: lighten(var(--black), 65%);
  border: 2px solid lighten(var(--black), 65%);
  pointer-events: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Estilos para diferentes colores de checkboxes */
.checkbox.blue input[type="checkbox"]:checked ~ span {
  background: var(--blue) url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnIHdpZHRoPSIxMiIgaGVpZ2h0PSI5IiB2aWV3Qm94PSIwIDAgMTIgOSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCiAgPHBhdGggZD0iTTQuNTc1IDguOTc3cy0uMzQtLjAwNy0uMzY4LjE0NS0uMzY4LjE0NUwzLjExNCA2Ljk4OC40NTIgNC4wNDMtMS4xMTMtLjA1NyAzLjM5Ny4wNTYgNS4xNTQuMDIxLjA1NyAxLjA3MyAwLjAwNy44MzUgMC4yMjguMDA3IDAuNjI5LjAwNyAwLjYyMy4wMjIuMjA4LjAyMy4zMzEuMDIyLjMzMi4wODMuMzMyLjExNi0uMDYyLjMzMy4xNDUtLjMzMy4zNjV6IiBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4NCjwvc3ZnPjwvc3ZnPg==) 50% 40% no-repeat;
  border: 2px solid var(--blue);
}

.checkbox.red input[type="checkbox"]:checked ~ span {
  background: var(--red) url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnIHdpZHRoPSIxMiIgaGVpZ2h0PSI5IiB2aWV3Qm94PSIwIDAgMTIgOSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCiAgPHBhdGggZD0iTTQuNTc1IDguOTc3cy0uMzQtLjAwNy0uMzY4LjE0NS0uMzY4LjE0NUwzLjExNCA2Ljk4OC40NTIgNC4wNDMtMS4xMTMtLjA1NyAzLjM5Ny4wNTYgNS4xNTQuMDIxLjA1NyAxLjA3MyAwLjAwNy44MzUgMC4yMjguMDA3IDAuNjI5LjAwNyAwLjYyMy4wMjIuMjA4LjAyMy4zMzEuMDIyLjMzMi4wODMuMzMyLjExNi0uMDYyLjMzMy4xNDUtLjMzMy4zNjV6IiBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4NCjwvc3ZnPjwvc3ZnPg==) 50% 40% no-repeat;
  border: 2px solid var(--red);
}
</style>