import { collection, getDocs, query, where } from "firebase/firestore"
import { useRouter } from "next/router"
import { useStateContext } from "./context/StateContext"
import { db } from "./lib/firebase"

export function withPublic(Component){
    return function WithPublic(props){
        const context = useStateContext()
        const router = useRouter()

        if(context.user){
            router.replace("/")
            return <div className="bg-slate-200 h-[calc(100vh-84px)]"></div>
        }
        return <Component {...props} />
    }
    
}

export function withProtectedPublic(Component){
    return function WithProtected(props){
        const context = useStateContext()
        const router = useRouter()

        console.log(context.user)
        if(!context.user){
            router.replace("/")
            return <div className="bg-slate-200 h-[calc(100vh-84px)]"></div>
        }
        return <Component {...props}/>
    }
    
}

export function protectedProfile(Component){
    return function ProtectedProfile(props){
        const router = useRouter()
        const {user} = useStateContext()

        if(!user){
            router.replace("/")
            return <div className="bg-slate-200 h-[calc(100vh-84px)]"></div>
        }else {
            return <Component {...props}/>

        }

        
        }
        
    }
    
