export function formatMessage(rawText) {
    const lines = rawText.split("\n").filter(line => line.trim() !== "");
    let result = "";
  
    lines.forEach(line => {
      // Nếu là dòng bắt đầu bằng dấu * thì là tên khóa
      if (line.startsWith("*")) {
        result += `\n📌 ${line.replace("*", "").trim()}\n`;
      }
      // Nếu là dòng bắt đầu bằng ** thì là tên khóa in đậm
      else if (line.startsWith("**") && line.endsWith("**")) {
        result += `\n📌 ${line.replace(/\*\*/g, "").trim()}\n`;
      }
      // Nếu chứa từ "Thời lượng" hoặc "Ưu đãi" hoặc "học phí" thì xuống dòng trước
      else if (
        line.includes("Thời lượng") ||
        line.includes("học phí") ||
        line.includes("Ưu đãi")
      ) {
        result += `➡️ ${line.trim()}\n`;
      }
      // Còn lại thì nối tiếp
      else {
        result += `${line.trim()}\n`;
      }
    });
  
    return result.trim();
  }
  