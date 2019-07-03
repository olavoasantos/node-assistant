module.exports = {
	extends: ['@commitlint/config-conventional'],
	parserPreset: './config/commitFormat',
  rules: {
		'header-max-length': [0],
    'subject-full-stop': [2, 'never'],
    'scope-empty': [2, 'never'],
    'scope-case': [2, 'always', 'upper-case'],
    'scope-enum': [
			2,
			'always',
      [
				'BASE',
				'ARGS',
				'COMMAND',
				'CONFIG',
				'CONSOLE',
				'CORE',
				'PATHS',
				'DOCS',
				'ASSISTANT',
      ],
    ],
    'type-case': [2, 'always', 'upper-case'],
		'type-empty': [2, 'never'],
		'type-enum': [
			2,
			'always',
			[
				'FIX',
				'CI',
				'DOCS',
				'FEAT',
				'PERF',
				'REFACTOR',
				'REVERT',
				'STYLE',
				'TEST',
			]
		],
  }
};
