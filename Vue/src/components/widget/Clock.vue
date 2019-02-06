<template>
    <div id="clock" style="border-radius: 15px; background-color: white">
      <p class="date">{{ date }}</p>
      <p class="time">{{ time }}</p>
      <p class="text">DIGITAL CLOCK with Vue.js</p>
    </div>
</template>

<script>

  export default {
    name: "Clock",
    data: function () {
      return {
        time: '',
        date: '',
        week: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
        timerID: setInterval(this.updateTime, 1000)
      }
    },
    components: {
    },
    props: {
      config: Object
    },
    methods: {
      updateTime() {
        var cd = new Date();
        this.time = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2);
        this.date = this.zeroPadding(cd.getFullYear(), 4) + '-' + this.zeroPadding(cd.getMonth()+1, 2) + '-' + this.zeroPadding(cd.getDate(), 2) + ' ' + this.week[cd.getDay()];
      },
      zeroPadding(num, digit) {
        var zero = '';
        for(var i = 0; i < digit; i++) {
          zero += '0';
        }
        return (zero + num).slice(-digit);
      }
    },
    mounted() {
      this.updateTime();



    }
  }
</script>

<style>
  html, body {
    height: 100%;
  }
  body {
    background: #0f3854;
    background: radial-gradient(ellipse at center, #0a2e38 0%, #000 70%);
    background-size: 100%;
  }
  p {
    margin: 0;
    padding: 0;
  }
  #clock {
    font-family: 'Share Tech Mono', monospace;
    color: #fff;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #000000;
    text-shadow: 0 0 20px rgb(0, 0, 0), 0 0 20px rgba(10, 175, 230, 0);
  }
  #clock .time {
    letter-spacing: 0.05em;
    font-size: 80px;
    padding: 5px 0;
  }
  #clock .date {
    letter-spacing: 0.1em;
    font-size: 24px;
  }
  #clock .text {
    letter-spacing: 0.1em;
    font-size: 12px;
    padding: 20px 0 0;
  }

</style>
