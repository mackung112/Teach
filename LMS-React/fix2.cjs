const fs = require('fs');

const fixBackticks = (file) => {
  let content = fs.readFileSync(file, 'utf8');
  // Find taskText={...} block
  const taskTextMatch = content.match(/taskText=\{`([\s\S]*?)`\}/);
  if (taskTextMatch) {
    let inner = taskTextMatch[1];
    // Replace all remaining backticks inside inner with single quotes
    inner = inner.replace(/`/g, "'");
    content = content.replace(taskTextMatch[0], `taskText={\`${inner}\`}`);
  }
  
  // Fix > in oop1_7
  if (file.includes('oop1_7')) {
    content = content.replace(/> python main\.py/g, '{">"} python main.py');
  }
  
  fs.writeFileSync(file, content);
};

['oop1_5.jsx', 'oop1_6.jsx', 'oop1_7.jsx', 'oop1_3.jsx'].forEach(f => {
  fixBackticks('d:/Teach/LMS-React/src/components/interactive/oop/' + f);
});
console.log('Fixed backticks and >');
