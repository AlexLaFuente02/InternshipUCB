<template>
        <div class="container__button">
            <button class="button"
            :style="{ backgroundColor: colorSelected}"
            @mouseenter="hoverColor"
            @mouseleave="normalColor"
            :disabled="buttonDisabled"
            @click="send"
             >{{ buttonText }}</button>

        </div>
</template>
<script>
export default {
    props: {
        text: String,
        color: Number,
        disabled: Boolean,
    },
    data() {
        return {
            listColors: [
                '#4D9FDC',
                '#78909C',
                '#C5E1A5',
                '#81D4FA',
                '#FFE082',
                '#CE93D8',
                '#F48FB1',
            ],
            hoverlistColors:[
                '#1B74C5',
                '#69838f',
                '#b2d788',
                '#5dc8f9',
                '#ffd65c',
                '#c278ce',
                '#f16c98',
            ],
            buttonText: this.text,
            buttonColor: this.color,
            buttonDisabled: this.disabled,
            colorSelected: '',
        };
    },
    mounted() {
        this.colorSelected = this.listColors[this.color];
    },
    methods: {
        hoverColor() {
            this.colorSelected = this.hoverlistColors[this.color];
        },
        normalColor() {
            this.colorSelected = this.listColors[this.color];
        },
        send() {
            this.$emit("option-selected",true);
        },
    },
}
</script>
<style scoped>
.container__button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.3rem;
}
.button{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5% 10%;
    border: 1px solid ; 
    border-radius: 5px;
    font-weight: 700;
    font-size: 0.5rem;
    cursor: pointer;
    color: #f8fafc;
    outline: none;
    transition: all 0.3s ease-in-out;
    font-size: 20px;
}
.button:hover{
    transform: scale(1.05);
}
.button:disabled{
    cursor: not-allowed;
    opacity: 0.5;
}
/*Media queries*/
@media screen and (max-width: 1250px) {
    .button{
        font-size: 0.8rem;
    }
}
@media screen and (max-width: 768px) {
    .button{
        font-size: 0.6rem;
    }
}
@media screen and (max-width: 600px) {
    .button{
        font-size: 0.6rem;
    }
}
   
</style>