import '@/App.css'
import '@/components/List'
import List from '@/components/List'
import { SignoutButton } from '@/components/SignOut'

function Home() {
    return (
        <div>
            <SignoutButton/>
            <List/>
        </div>
    )
}

export default Home
