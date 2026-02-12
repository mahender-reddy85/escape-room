import { LevelConfig } from './types';

export const LEVELS: LevelConfig[] = [
  {
    id: 1,
    themeColor: '#4ade80',
    ambientIntensity: 0.4,
    keyRevealMechanism: 'drawer',
    pinCode: '1024',
    questionHint: "Focus on standard syntax and the entry point of a C program.",
    locationHint: "The middle shelf (Drawer 1) holds the fragment in its deepest shadow.",
    questions: [
      {
        type: 'MCQ',
        topic: 'Syntax',
        prompt: 'Which character is used to terminate a statement in C?',
        options: [':', '.', ';', ','],
        answer: ';'
      },
      {
        type: 'TEXT',
        topic: 'Entry Point',
        prompt: 'What is the standard return type of the main() function?',
        answer: 'int'
      },
      {
        type: 'MCQ',
        topic: 'Comments',
        prompt: 'How do you start a multi-line comment in C?',
        options: ['//', '/*', '<!--', '#'],
        answer: '/*'
      }
    ]
  },
  {
    id: 2,
    themeColor: '#60a5fa',
    ambientIntensity: 0.35,
    keyRevealMechanism: 'drawer',
    pinCode: '2048',
    questionHint: "Logical operators use short-circuiting behavior.",
    locationHint: "Check the top shelf (Drawer 0). Objects may be smaller than they appear.",
    questions: [
      {
        type: 'TEXT',
        topic: 'Logic',
        prompt: 'What is the result of (5 > 3 && 2 < 1)? (0 or 1)',
        answer: '0'
      },
      {
        type: 'MCQ',
        topic: 'Precedence',
        prompt: 'Which operator has higher precedence: * or +?',
        options: ['*', '+', 'Same precedence'],
        answer: '*'
      },
      {
        type: 'TEXT',
        topic: 'Assignment',
        prompt: 'What value is in x after: int x = 10; x += 5; x *= 2;',
        answer: '30'
      }
    ]
  },
  {
    id: 3,
    themeColor: '#facc15',
    ambientIntensity: 0.3,
    keyRevealMechanism: 'drawer',
    pinCode: '4096',
    questionHint: "Pointers store memory addresses. Dereferencing accesses the value.",
    locationHint: "The bottom shelf (Drawer 2) is often overlooked. Search the corners.",
    questions: [
      {
        type: 'MCQ',
        topic: 'Pointers',
        prompt: 'Which operator is used to get the address of a variable?',
        options: ['*', '&', '->', '@'],
        answer: '&'
      },
      {
        type: 'MCQ',
        topic: 'Arrays',
        prompt: 'What is the output?\n#include <stdio.h>\nint main() {\n    char str[] = "Hello";\n    printf("%lu", sizeof(str));\n    return 0;\n}',
        options: ['5', '6', '4', '8'],
        answer: '6'
      },
      {
        type: 'MCQ',
        topic: 'Arrays',
        prompt: 'If arr is an array, arr[3] is equivalent to which pointer expression?',
        options: ['*(arr + 3)', '*arr + 3', '&arr + 3', 'arr->3'],
        answer: '*(arr + 3)'
      }
    ]
  },
  {
    id: 4,
    themeColor: '#f87171',
    ambientIntensity: 0.25,
    keyRevealMechanism: 'drawer',
    pinCode: '8192',
    questionHint: "Memory management requires manual 'freeing' of heap allocations.",
    locationHint: "In Level 4, the terminal board hides secrets. Look behind the logic.",
    questions: [
      {
        type: 'MCQ',
        topic: 'Memory',
        prompt: 'What is the output?\n#include <stdio.h>\nint main() {\n    int x = 5;\n    printf("%d %d %d", x, x++, ++x);\n    return 0;\n}',
        options: ['5 5 7', '5 6 7', 'Undefined Behavior', '5 6 6'],
        answer: 'Undefined Behavior'
      },
      {
        type: 'MCQ',
        topic: 'Strings',
        prompt: 'What is the last character in a C string by default?',
        options: ['\\n', '\\t', '\\0', '\\s'],
        answer: '\\0'
      },
      {
        type: 'MCQ',
        topic: 'Strings',
        prompt: 'What is the output?\n#include <stdio.h>\nint main() {\n    printf("%d", \'a\' - \'A\');\n    return 0;\n}',
        options: ['26', '32', '1', '0'],
        answer: '32'
      }
    ]
  },
  {
    id: 5,
    themeColor: '#c084fc',
    ambientIntensity: 0.2,
    keyRevealMechanism: 'drawer',
    pinCode: '9999',
    questionHint: "Advanced constructs involve function pointers and volatile storage.",
    locationHint: "Total silence. All three drawers must be open to triangulate the final key.",
    questions: [
      {
        type: 'MCQ',
        topic: 'Advanced',
        prompt: 'What does the "static" keyword do to a local variable?',
        options: ['Makes it constant', 'Preserves value between calls', 'Moves it to heap', 'Makes it global'],
        answer: 'Preserves value between calls'
      },
      {
        type: 'MCQ',
        topic: 'Structures',
        prompt: 'What is the output?\n#include <stdio.h>\nint main() {\n    printf("%d", \'z\');\n    return 0;\n}',
        options: ['120', '121', '122', '123'],
        answer: '122'
      },
      {
        type: 'MCQ',
        topic: 'Macros',
        prompt: 'Which preprocessor directive is used to define a macro?',
        options: ['#macro', '#const', '#define', '#set'],
        answer: '#define'
      }
    ]
  }
];