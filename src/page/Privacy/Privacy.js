
import DocViewer, { PDFRenderer } from 'react-doc-viewer';

const Privacy = () => {
  const docs = [
    { uri: require('./privacy.pdf') }
  ]

  return (
    <DocViewer
      pluginRenderers={PDFRenderer}
      documents={docs} />
  )

}
export default Privacy;
