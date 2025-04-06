// Script para copiar automáticamente los archivos de traducción a la carpeta pública
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, 'src', 'i18n');
const destDir = path.join(__dirname, 'public', 'i18n');

// Asegurarse de que el directorio de destino exista
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Copiar archivos de traducción
function copyTranslationFiles() {
  try {
    const files = fs.readdirSync(srcDir);
    
    files.forEach(file => {
      if (file.endsWith('.json')) {
        const srcPath = path.join(srcDir, file);
        const destPath = path.join(destDir, file);
        
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copiado: ${file} a la carpeta pública`);
      }
    });
    
    console.log('Todos los archivos de traducción han sido copiados correctamente.');
  } catch (error) {
    console.error('Error al copiar archivos de traducción:', error);
  }
}

// Ejecutar la copia
copyTranslationFiles();

// Observar cambios en los archivos de traducción
fs.watch(srcDir, (eventType, filename) => {
  if (filename && filename.endsWith('.json')) {
    console.log(`Cambio detectado en: ${filename}`);
    copyTranslationFiles();
  }
});

console.log('Observando cambios en los archivos de traducción...');
