const fs = require('fs');

const files = [
  'd:/Teach/LMS-React/src/components/interactive/oop/oop1_3.jsx',
  'd:/Teach/LMS-React/src/components/interactive/oop/oop1_4.jsx',
  'd:/Teach/LMS-React/src/components/interactive/oop/oop1_5.jsx',
  'd:/Teach/LMS-React/src/components/interactive/oop/oop1_6.jsx',
  'd:/Teach/LMS-React/src/components/interactive/oop/oop1_7.jsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/\\`/g, '`');
  content = content.replace(/\\\$/g, '$');
  // Also fix `<_` from `oop1_4.jsx`
  content = content.replace(/><_/g, '><_'); // Oh wait, JSX error was `><_`. I will just fix it.
  fs.writeFileSync(file, content);
}
console.log('Fixed files!');
