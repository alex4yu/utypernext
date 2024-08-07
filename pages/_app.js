import Layout from "../comp/Layout"
import '../styles/global.css';
import { SettingsProvider } from "./settingsContext";

function MyApp({ Component, pageProps }) {
  return (
    <SettingsProvider>
      <Layout>
        <Component {...pageProps}/>
      </Layout>
    </SettingsProvider>
    
  )
}

export default MyApp