import Layout from "../comp/Layout"
import '../styles/global.css';
import { SettingsProvider } from "./code/settingsContext";
import SettingsContext from "./code/settingsContext";

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