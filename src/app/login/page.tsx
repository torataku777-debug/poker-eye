import { signIn } from "@/auth"
import styles from "./login.module.css"

export default function Page() {
    return (
        <div className={styles.container}>
            <form
                action={async (formData) => {
                    "use server"
                    await signIn("credentials", formData)
                }}
                className={styles.form}
            >
                <h1 className={styles.title}>Poker Eye Login</h1>
                <p className={styles.subtitle}>Please enter the password to continue</p>
                <input name="password" type="password" placeholder="Password (admin)" required className={styles.input} />
                <button className={styles.button}>Sign In</button>
            </form>
        </div>
    )
}
