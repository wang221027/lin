import html2Canvas from 'html2canvas'
import jsPDF from 'jspdf'
const htmlToPdf = {
  getPdf(title: any, id: any) {
    const pdfContent = document.querySelector(id)
    pdfContent.ownerDocument.defaultView.innerHeight = 1000
    pdfContent.ownerDocument.defaultView.innerWidth = 1000
    html2Canvas(pdfContent, {
      logging: false,
      useCORS: true,
      scale: 2
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg', 1.0)
      const pdf = new jsPDF('p', 'mm', 'a4')
      const a4w = 150 // A4宽度，为190mm
      const a4h = 237 // A4高度为297mm，减去上下边距后为277mm
      const imgHeight = (a4w * canvas.height) / canvas.width // 图像高度
      const pageHeight = a4h // 每一页应显示的内容高度
      let heightLeft = imgHeight // 剩余高度
      let position = 0 // 上一页的结束位置
      while (heightLeft > 0) {
        // 将当前图像的部分添加到PDF中
        pdf.addImage(imgData, 'JPEG', 10, position, a4w, imgHeight)
        // 更新剩余的高度
        heightLeft -= pageHeight + 20
        // 如果还有内容，添加新页
        if (heightLeft > 0) {
          pdf.addPage()
          position = heightLeft > 0 ? -heightLeft + 20 : 0 // 设置位置以裁剪图像
          // 注意：这里 position = -heightLeft 是为了向上移动到下一部分
        }
      }
      pdf.save(title + '.pdf')
    })
  }
}
export default htmlToPdf
