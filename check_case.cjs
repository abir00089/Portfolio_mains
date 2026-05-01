const fs = require('fs');
const path = require('path');

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, fileList);
    } else if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

function checkPathCaseExact(requestPath) {
  let pathsToTry = [requestPath];
  if (!path.extname(requestPath)) {
      pathsToTry = [requestPath + '.jsx', requestPath + '.js'];
  }
  
  for (let p of pathsToTry) {
      if (fs.existsSync(p)) {
          const dir = path.dirname(p);
          const base = path.basename(p);
          const actualFiles = fs.readdirSync(dir);
          if (actualFiles.includes(base)) {
              return true;
          }
      }
  }
  
  let p = pathsToTry[0];
  const dir = path.dirname(p);
  if (!fs.existsSync(dir)) return false;
  
  const ext = path.extname(p);
  const baseNoExt = ext ? path.basename(p, ext) : path.basename(p);
  
  const actualFiles = fs.readdirSync(dir);
  const match = actualFiles.find(f => f.toLowerCase() === baseNoExt.toLowerCase() + '.jsx' || f.toLowerCase() === baseNoExt.toLowerCase() + '.js');
  
  if (match) {
      return { expected: match, actual: baseNoExt };
  }
  
  return false;
}

const allFiles = getFiles('./src');
const regex = /from\s+['"](\.[^'"]+)['"]/g;
const dynamicImportRegex = /import\s*\(\s*['"](\.[^'"]+)['"]\s*\)/g;

for (const file of allFiles) {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = regex.exec(content)) !== null) {
    const importPath = match[1];
    const resolvedPath = path.resolve(path.dirname(file), importPath);
    const res = checkPathCaseExact(resolvedPath);
    if (typeof res === 'object') {
        // Find what the exact imported name should be in the code
        // For example if importPath is "./FrameWorks" and res.expected is "Frameworks.jsx"
        // we should change it to "./Frameworks"
        const ext = path.extname(res.expected);
        const baseExpected = path.basename(res.expected, ext);
        const baseImportPath = path.basename(importPath);
        const newImportPath = importPath.substring(0, importPath.length - baseImportPath.length) + baseExpected;
        console.log(`Mismatch in ${file}: import "${importPath}" -> should be "${newImportPath}"`);
    }
  }
  while ((match = dynamicImportRegex.exec(content)) !== null) {
    const importPath = match[1];
    const resolvedPath = path.resolve(path.dirname(file), importPath);
    const res = checkPathCaseExact(resolvedPath);
    if (typeof res === 'object') {
        const ext = path.extname(res.expected);
        const baseExpected = path.basename(res.expected, ext);
        const baseImportPath = path.basename(importPath);
        const newImportPath = importPath.substring(0, importPath.length - baseImportPath.length) + baseExpected;
        console.log(`Mismatch in ${file}: import("${importPath}") -> should be "${newImportPath}"`);
    }
  }
}
