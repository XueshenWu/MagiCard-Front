<script setup>


const { title, features, paragraphs, src } = {
    title: "收费标准",
    features: ['$11.99 / 1年', '0 月费'],
    paragraphs: ['充值手续费 3.5%','提现手续费 0%','消费手续费 0%','非美国消费 1%+$0.5','预扣款撤销费 $1','交易退款费 2%'],
    src: "/main-no-product-bg1.png"
}


</script>

<template>
   <div class="bg-white text-sm border-sky-300 border rounded-xl flex flex-col relative py-4 px-2">
    <img :src="src" alt="feature" class="absolute h-[360px] aspect-auto  " />

    <div>
        {{ title }}
    </div>
  
    <div class="grid grid-cols-2 gap-y-2 mt-36 font-bold z-10">
        <p v-for="f in features">{{f}}</p>
    </div>
    <div class="grid grid-cols-2 gap-y-1 gap-x-2 mt-4">
        <p v-for="p in paragraphs">{{p}}</p>
    </div>
</div>

</template>