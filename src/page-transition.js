import barba from '@barba/core'
import gsap from 'gsap'
barba.init({
    transition:[{
        name: 'default-transition',
    leave() {
      // create your stunning leave animation here
      return gsap.to(data.current.container, {
        opacity: 0
      });
    },
    enter() {
      // create your amazing enter animation here
      return gsap.from(data.next.container, {
        opacity: 0
      });
    }
    }]
})