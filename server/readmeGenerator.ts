import fs from 'fs';
import inquirer from 'inquirer';

interface Answers {
  title: string;
  description: string;
  installation: string;
  usageInformation: string;
  contributionGuidelines: string;
  testInstructions: string;
}

export function generateReadme() {
  if (fs.existsSync('README.md')) {
    console.log('README.md already exists. Skipping generation.');
    return;
  }

  inquirer
    .prompt<Answers>([
      { type: 'input', name: 'title', message: 'What is your project title?' },
      { type: 'input', name: 'description', message: 'Provide a description:' },
      { type: 'input', name: 'installation', message: 'Provide installation instructions:' },
      { type: 'input', name: 'usageInformation', message: 'Provide usage information:' },
      { type: 'input', name: 'contributionGuidelines', message: 'Provide contribution guidelines:' },
      { type: 'input', name: 'testInstructions', message: 'Provide test instructions:' },
    ])
    .then((answers) => {
      const { title, description, installation, usageInformation, contributionGuidelines, testInstructions } = answers;
      const readmeContent = `# ${title}\n\n${description}\n\n${installation}\n\n${usageInformation}\n\n${contributionGuidelines}\n\n${testInstructions}`;

      fs.writeFileSync('README.md', readmeContent);
      console.log('README.md has been generated!');
    });
}
