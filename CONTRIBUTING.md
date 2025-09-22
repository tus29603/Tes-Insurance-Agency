# Contributing to Tes Insurance Agency

Thank you for your interest in contributing to the Tes Insurance Agency project! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Git
- Docker (optional)
- Code editor (VS Code recommended)

### Development Setup

1. **Fork the repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/Tes-Insurance-Agency.git
   cd Tes-Insurance-Agency
   ```

2. **Install dependencies**
   ```bash
   # Frontend
   npm install
   
   # Backend
   cd backend
   npm install
   cd ..
   ```

3. **Set up environment variables**
   ```bash
   # Copy example files
   cp .env.example .env
   cp backend/env.example backend/.env
   
   # Edit with your configuration
   ```

4. **Start development servers**
   ```bash
   # Frontend (terminal 1)
   npm run dev
   
   # Backend (terminal 2)
   cd backend
   npm run dev
   ```

## 📋 Development Workflow

### Branch Naming
- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `hotfix/description` - Critical fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring

### Commit Messages
Follow the conventional commits format:
```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

Examples:
```
feat(quote): add real-time quote generation
fix(api): resolve database connection timeout
docs(readme): update installation instructions
```

### Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, readable code
   - Add tests for new functionality
   - Update documentation as needed
   - Follow the coding standards

3. **Test your changes**
   ```bash
   # Frontend tests
   npm run test
   npm run lint
   
   # Backend tests
   cd backend
   npm test
   npm run lint
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat(component): add new feature"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Use the PR template
   - Provide a clear description
   - Link related issues
   - Request reviews from maintainers

## 🎨 Coding Standards

### JavaScript/React
- Use ES6+ features
- Prefer functional components
- Use TypeScript for new files
- Follow React best practices
- Use meaningful variable names

### CSS/Styling
- Use Tailwind CSS classes
- Follow mobile-first approach
- Use CSS custom properties
- Maintain consistent spacing

### Backend/Node.js
- Use async/await over callbacks
- Implement proper error handling
- Use JSDoc for documentation
- Follow RESTful API conventions

### Database
- Use parameterized queries
- Implement proper indexing
- Follow naming conventions
- Add proper constraints

## 🧪 Testing

### Frontend Testing
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Backend Testing
```bash
cd backend

# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run integration tests
npm run test:integration
```

### Testing Guidelines
- Write unit tests for new functions
- Add integration tests for API endpoints
- Test error scenarios
- Maintain >80% code coverage
- Use descriptive test names

## 📚 Documentation

### Code Documentation
- Use JSDoc for functions
- Add inline comments for complex logic
- Update README files
- Document API endpoints

### Documentation Types
- API documentation
- Component documentation
- Setup instructions
- Deployment guides
- Troubleshooting guides

## 🐛 Bug Reports

When reporting bugs, please include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Environment details
- Screenshots if applicable

Use the bug report template in GitHub issues.

## 💡 Feature Requests

When suggesting features:
- Describe the problem it solves
- Provide use cases
- Consider implementation complexity
- Check existing issues first

Use the feature request template in GitHub issues.

## 🔒 Security

### Reporting Security Issues
- **DO NOT** create public issues for security vulnerabilities
- Email security issues to: security@tesinsurance.com
- Include detailed reproduction steps
- Allow reasonable time for response

### Security Guidelines
- Never commit secrets or credentials
- Use environment variables for sensitive data
- Implement proper input validation
- Follow OWASP guidelines
- Regular security audits

## 🏷 Labels and Milestones

### Issue Labels
- `bug`: Something isn't working
- `enhancement`: New feature or request
- `documentation`: Documentation improvements
- `frontend`: UI/UX related
- `backend`: API/database related
- `infrastructure`: DevOps related
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention needed

### Milestones
- `v1.0`: Initial release
- `v1.1`: First major update
- `v2.0`: Major version update

## 👥 Community Guidelines

### Code of Conduct
- Be respectful and inclusive
- Welcome newcomers
- Provide constructive feedback
- Focus on the issue, not the person
- Help others learn and grow

### Communication
- Use clear, concise language
- Be patient with questions
- Provide context in discussions
- Use appropriate channels

## 🎯 Contribution Ideas

### Good First Issues
- Documentation improvements
- UI/UX enhancements
- Test coverage improvements
- Bug fixes
- Performance optimizations

### Advanced Contributions
- New features
- Architecture improvements
- Security enhancements
- Performance optimizations
- Integration work

## 📞 Getting Help

### Resources
- GitHub Discussions
- Documentation
- Code comments
- Issue discussions

### Contact
- Email: dev@tesinsurance.com
- GitHub: @tus29603
- Discord: [Community Server]

## 🙏 Recognition

Contributors will be recognized in:
- README contributors section
- Release notes
- Project documentation
- Annual contributor awards

Thank you for contributing to Tes Insurance Agency! 🎉
