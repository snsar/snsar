import yaml
import re

def read_yaml_frontmatter(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
        # Extract YAML between --- markers
        match = re.match(r'^---\n(.*?)\n---\n', content, re.DOTALL)
        if match:
            return yaml.safe_load(match.group(1))
    return {}

def generate_latex(data):
    template = r"""
\documentclass[a4paper,11pt]{article}
\usepackage[utf8]{inputenc}
\usepackage{hyperref}
\usepackage{fontawesome5}
\usepackage[margin=1in]{geometry}
\usepackage{titlesec}
\usepackage{enumitem}

\begin{document}

% Header
\begin{center}
{\Huge \textbf{%(name)s}}\\[0.5em]
{\Large %(title)s}\\[0.5em]
\href{%(contact.github)s}{\faGithub\ GitHub} $|$
\href{%(contact.linkedin)s}{\faLinkedin\ LinkedIn} $|$
\faEnvelope\ %(contact.email)s
\end{center}

% Skills
\section{Skills}
"""
    
    # Add skills section
    for category, skills in data['skills'].items():
        template += f"\\textbf{{{category.title()}}}: {', '.join(skills)}\\\\[0.5em]\n"
    
    # Add experience section
    template += "\n\\section{Experience}\n"
    for exp in data['experience']:
        template += f"\\subsection*{{{exp['role']} | {exp['company']} | {exp['period']}}}\n"
        template += "\\begin{itemize}[leftmargin=*]\n"
        for highlight in exp['highlights']:
            template += f"\\item {highlight}\n"
        template += "\\end{itemize}\n"
    
    # Add projects section
    template += "\n\\section{Projects}\n"
    for project in data['projects']:
        template += f"\\subsection*{{{project['name']}}}\n"
        template += f"\\textbf{{Tech Stack:}} {project['tech']}\\\\[0.3em]\n"
        template += "\\begin{itemize}[leftmargin=*]\n"
        for feature in project['features']:
            template += f"\\item {feature}\n"
        template += "\\end{itemize}\n"
    
    template += "\n\\end{document}"
    
    return template

def main():
    # Read YAML from README
    data = read_yaml_frontmatter('README.md')
    
    # Generate LaTeX content
    latex_content = generate_latex(data)
    
    # Write LaTeX file
    with open('resume.tex', 'w', encoding='utf-8') as f:
        f.write(latex_content)

if __name__ == '__main__':
    main()
