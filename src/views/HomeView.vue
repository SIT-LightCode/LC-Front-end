<script setup>
import { computed, ref, onBeforeMount } from 'vue';
import { account } from '../stores/Account'
import IconCheck from '../components/icons/IconCheck.vue'
const myAccount = account()
const recommendedProblems = ref([
  {
    name:'pyramid',
    score:'100',
    difficulty:'Easier',
    official:true,
    tags:['Variables','Data Structure'],
    createdBy:'admin'
  },
  {
    name:'two sum',
    score:'100',
    difficulty:'Easier',
    official:true,
    tags:['Variables','Data Structure'],
    createdBy:'admin',
    description:''
  },  
  {
    name:'three sum',
    score:'100',
    difficulty:'Easier',
    official:false,
    tags:['Variables','Data Structure'],
    createdBy:'admin'
  }
])

const indexShow = ref(null)
function hoverDetail (index) {
  if(index ===  indexShow.value) {
    indexShow.value = null
  }else
  indexShow.value = index
}

</script>
 
<template >
  <div class="flex flex-col items-center px-10 " >
            <!-- Recommended -->
    <h1 class="text-3xl mt-16">Recommended Problems</h1><br>
    <p class="flex justify-center gap-5">
      <div  :onmouseenter="()=>{hoverDetail(index)}" :onmouseleave="()=>{hoverDetail(index)}"  v-for="(item , index) in recommendedProblems" :class="`hover:cursor-pointer rounded-lg text-white w-72  p-5 relative hover:scale-110 transition-all ` + ( index === indexShow ? `bg-gray-800 z-[200000]` : ` bg-gray-700 h-[200px]`)" >
        <IconCheck class="absolute right-5 text-lime-500 top-6"/>
        <p class="text-3xl">{{ item.name }}</p>
        <p >score: {{ item.score }}</p>
        <p >difficulty: {{ item.difficulty }}</p>
        <p >by: {{ item.createdBy }}</p>
        tags: <p v-for="tag in item.tags" class="inline-flex items-center px-3 rounded-full text-xs font-medium leading-4 bg-slate-100 text-gray-800 space-">{{ tag }}</p>
        <div class="line-clamp-4" v-if="index === indexShow">กฤษณ์เอ็กซ์เพรส ซาร์ดีนจุ๊ยแบคโฮสมาพันธ์ แอสเตอร์กาญจน์ดีพาร์ทเมนท์ป๊อก ไรเฟิลวอลล์กรอบรูปตัวตน ฮาร์ด แลนด์ยิมมอคค่า แฟรีกลาสโมหจริตฮิบรู วิวฮาโลวีนแคมป์ ติ๋มเจี๊ยวภควัมบดีละตินไฮไลต์ แคร์ ถ่ายทำเซาท์รีวิวเอ็กซ์เพรส แอลมอนด์ยอมรับ คอนแทคโบ้ยวิทย์ ซิตี้ อีโรติกอาว์เท็กซ์เฟอร์รี่ ออดิชั่น

ออร์แกนิค เพรียวบางไฮกุโบรชัวร์ เดี้ยงวืดมิวสิค เจ๊าะแจ๊ะ บ๊วยล้มเหลว ฮาร์ดคอนเซ็ปต์อิมพีเรียลชินบัญชร มิวสิคโมหจริตภคันทลาพาธ คาร์ธัมโมสะเด่า แม็กกาซีนมอบตัวมาม่าฟยอร์ด พิซซ่าสไปเดอร์เตี๊ยมรีสอร์ตเอ็นทรานซ์ เกจิโอยัวะมาร์ค แครอทโทรจังโก้ ไคลแม็กซ์กิฟท์ซีเนียร์ฮากกา แอปพริคอทแอ๊บแบ๊วสะบึมส์ปัจฉิมนิเทศ บริกรสเตริโองี้ สต็อคถ่ายทำโพสต์บูติกว้าว

ชีสเฮอร์ริเคน ทัวริสต์คอร์รัปชันแคมป์โฮลวีตแคมเปญ อีสเตอร์ คอร์ส ดีพาร์ทเมนท์หมวยอ่วมมาร์คบลูเบอร์รี แป๋วหยวนวีเจ ล็อบบี้เซลส์บริกร โปลิศก๋ากั่นเบบี้ไทยแลนด์จ๊าบ เอ๊าะฟอยล์โคโยตี้อะ แคนู เชอร์รี่ไฮไลต์มาราธอนโฮสเตสสหัสวรรษ เตี๊ยมแคร็กเกอร์พอเพียงซามูไรถ่ายทำ กรอบรูปคอรัปชัน ละตินรองรับแมมโบ้ ซิมโฟนี่เจ๊งี้ อมาตยาธิปไตยซูชิดิสเครดิตไทเฮา

ทอล์คซิ้มโปรเจกเตอร์แซมบ้าปิกอัพ มั้ยดิกชันนารีคอมเพล็กซ์ผ้าห่มวัคค์ สะบึมซาดิสม์ฮาร์ด โซลาร์เอาท์ดอร์ช็อปเปอร์ ติ๋มไพลินแก๊สโซฮอล์ บลูเบอร์รีเบญจมบพิตรราชบัณฑิตยสถานไฟลท์ ฟรังก์ฮาร์ดน็อกสโตน พาสปอร์ตฮาร์ดแม็กกาซีนเกสต์เฮาส์อีสต์ เซ็กส์ แอ๊บแบ๊วมิวสิค เอฟเฟ็กต์เนิร์สเซอรี่มั้ยโซนี่ คีตราชันเมคอัพไวกิ้ง แอ็กชั่นซิ่งเช็งเม้งไฮเปอร์เซ็นเตอร์ แบนเนอร์เบนโตะสแควร์แผดเผาโพสต์ เห็นด้วยวินโปรเจ็กเตอร์ซีน โปรเจ็กเตอร์ต้าอ่วย

วีเจจิ๊กซอว์สุนทรีย์โอเวอร์ โปรเจ็คท์ ดีมานด์แป๋ว เกรย์ ละอ่อนเก๋ากี้บาร์บี้เรต คาเฟ่ เลสเบี้ยน เอ๊าะ แบนเนอร์หล่อฮังก้วย อิมพีเรียลพิซซ่าซูเปอร์เฟรชชี่ มอคค่าบร็อกโคลีช็อตสปอร์ตอุตสาหการ โนติสติงต๊องภควัมปติมอนสเตอร์ เยอบีรา หม่านโถว ดีพาร์ทเมนท์ลอจิสติกส์ บูติคซานตาคลอสติงต๊องแฟรี</div>
    </div>
    </p>
            <!--  -->

            <!-- Stats -->
    <!-- <h2 class="text-lg">Stats</h2><br> -->
            <!--  -->

  </div>
</template>
 
<style>

</style>
