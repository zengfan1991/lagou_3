import Vue from 'vue'
import dayjs from 'dayjs'
Vue.filter('date', (date, format = 'YYYY-MM-DD HH:mm:ss') => {
    return dayjs(date).format(format)
})