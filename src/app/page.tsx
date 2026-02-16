import { auth, signOut } from "@/auth"

export default async function Home() {
  const session = await auth()

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Poker Eye Admin Dashboard</h1>
      {session ? (
        <div>
          <p>Welcome, {session.user?.name} ({session.user?.email})</p>
          <form
            action={async () => {
              "use server"
              await signOut()
            }}
          >
            <button style={{
              backgroundColor: '#ef4444',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.25rem',
              marginTop: '1rem',
              border: 'none',
              cursor: 'pointer'
            }}>Sign Out</button>
          </form>
        </div>
      ) : (
        <p>You are not logged in. (This should not be visible if middleware works)</p>
      )}
    </div>
  )
}
