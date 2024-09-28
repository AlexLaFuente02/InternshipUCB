<!-- Dropdown.vue -->
<template>
    <div class="dropdown">
      <div class="dropdown__value" @click="toggleDropdown">
        <span v-if="!selectedValue">{{ placeholderValue }}</span>
        <span v-else>{{ selectedValue }}</span>
        <font-awesome-icon :icon="['fas', 'chevron-down']" style="color: #838b8e;"/>
      </div>
      <div class="dropdown-content" v-show="dropdownVisible">
        <ul class="dropdown__list">
          <li class="dropdown__list__item" v-for="option in options" :key="option.id" @click="selectOption(option)">{{ option.label }}</li>
        </ul>
      </div>
    </div>
</template>
  
<script>
  export default {
    props: {
      options: Array,
      selectedValue: String,
      placeholderValue: String,
    },
    data() {
      return {
        dropdownVisible: false,
      };
    },
    methods: {
      toggleDropdown() {
        this.dropdownVisible = !this.dropdownVisible;
      },
      selectOption(option) {
        this.$emit("option-selected", option);
        this.dropdownVisible = false;
      },
    },
  };
</script>
<style scoped>
.dropdown {
    position: relative;
    display: inline-block;
    width: 100%;
}
.dropdown__value{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border: 1px solid #dfe7f1;
    background-color: #FFF;
    border-radius: 5px;
}
.dropdown__value:hover {
    border-color: #91c5ff;
}
.dark-theme .dropdown__value:hover{
    border-color: #91c5ff;
}
.dark-theme .dropdown__value{
    border: 1px solid #434B54;
    background-color: #2F363F;
}
.dropdown__value span{
    font-size: 1rem;
    font-weight: 700;
}

.dropdown__value svg{
    font-size: 1rem;
    font-weight: 700;
}
.dropdown-content {
  max-height: 150px;
  overflow-y: auto;
  
    position: absolute;
    background-color: #FFF;
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
    min-width: 100%;
    z-index: 100;
    border-radius: 10px;
}
.dark-theme .dropdown-content{
    border: 1px solid #434B54;
    background-color: #2F363F;
}

.dropdown-content ul{
    list-style: none;
    padding: 0;
    margin: 0;
}
.dropdown-content li{
    padding: 10px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 700;
    border-bottom: 1px solid #dfe7f1;
}
.dark-theme .dropdown-content li{
    border-bottom: 1px solid #434B54;
}

.dropdown-content li:hover{
    background-color: rgba(232, 241, 248, 0.7);
    border-radius: 10px;
}
.dark-theme .dropdown-content li:hover{
    background-color: rgba(78, 86, 95, 0.7);
}
/*Media queries*/
@media screen and (max-width: 768px){
    .dropdown__value span{
        font-size: 0.75rem;
    }
    .dropdown__value svg{
        font-size: 0.75rem;
    }
    .dropdown-content li{
        font-size: 0.75rem;
    }
}
@media screen and (max-width: 576px){
    .dropdown__value span{
        font-size: 0.5rem;
    }
    .dropdown__value svg{
        font-size: 0.5rem;
    }
    .dropdown-content li{
        font-size: 0.5rem;
    }
}
</style>