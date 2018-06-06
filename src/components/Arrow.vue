<template>
  <div class="arrows">
    <div class="chevron"></div>
    <div class="chevron"></div>
    <div class="chevron"></div>
  </div>
</template>

<style scoped>
.arrows {
  display: flex;
  justify-content: center;
}
.chevron {
  position: absolute;
  width: 1.8rem;
  height: .3rem;
  opacity: 0;
  transform: scale3d(.5, .5, .5);
  animation: move 3s ease-out infinite;
}

.chevron:first-child {
  animation: move 3s ease-out 1s infinite;
}

.chevron:nth-child(2) {
  animation: move 3s ease-out 2s infinite;
}

.chevron:before,
.chevron:after {
  content: '';
  position: absolute;
  top: 0;
  height: 100%;
  background: #fff;
}

.chevron:before {
  width: 51%;
  left: 0;
  transform: skew(0deg, 35deg);
}

.chevron:after {
  right: 0;
  width: 51%;
  transform: skew(0deg, -35deg);
}

@keyframes move {
  25% {
    opacity: 1;

  }
  33% {
    opacity: 1;
    transform: translateY(30px);
  }
  67% {
    opacity: 1;
    transform: translateY(40px);
  }
  100% {
    opacity: 0;
    transform: translateY(55px) scale3d(0.5, 0.5, 0.5);
  }
}
</style>
