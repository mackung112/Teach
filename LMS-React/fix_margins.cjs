const fs = require('fs');
for(let i=1; i<=6; i++){
  let file = 'd:/01KruMac/Teach/LMS-React/src/components/interactive/ooad/ooad2_'+i+'.jsx';
  let content = fs.readFileSync(file, 'utf8');
  
  if (content.includes('max-w-7xl mx-auto')) continue;
  
  content = content.replace(/return\s*\(\n\s*<SimulatorShell/g, 'return (\n    <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-8 w-full">\n      <SimulatorShell');
  
  content = content.replace(/<\/SimulatorShell>\n\s*\);/g, '</SimulatorShell>\n    </div>\n  );');
  
  fs.writeFileSync(file, content);
}
console.log('Fixed margins for all 6 files.');
