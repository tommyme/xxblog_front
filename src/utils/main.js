import { useRouter } from "vue-router"

const jmp2art = (id) => {
  const router = useRouter()
  router.push({
    path: '/main/article/' + id,
  })
  console.log(art)
}

export { jmp2art }