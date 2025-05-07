import AntDesignSvg from '@/assets/skills/Ant Design.svg'
import AxiosSvg from '@/assets/skills/Axios.svg'
import CSS3Svg from '@/assets/skills/CSS3.svg'
import ElectronSvg from '@/assets/skills/Electron.svg'
import HTML5Svg from '@/assets/skills/HTML5.svg'
import JavaScriptSvg from '@/assets/skills/JavaScript.svg'
import jQuerySvg from '@/assets/skills/jQuery.svg'
import JSONSvg from '@/assets/skills/JSON.svg'
import JupyterSvg from '@/assets/skills/Jupyter.svg'
import NestjsSvg from '@/assets/skills/Nest.js.svg'
import NextjsSvg from '@/assets/skills/Next.js.svg'
import NodejsSvg from '@/assets/skills/Node.js.svg'
import PyCharmSvg from '@/assets/skills/PyCharm.svg'
import PythonPoetrySvg from '@/assets/skills/Python Poetry.svg'
import PythonSvg from '@/assets/skills/Python.svg'
import ReactSvg from '@/assets/skills/React.svg'
import ReduxSvg from '@/assets/skills/Redux.svg'
import RollupjsSvg from '@/assets/skills/Rollup.js.svg'
import SassSvg from '@/assets/skills/Sass.svg'
import SequelizeSvg from '@/assets/skills/Sequelize.svg'
import TailwindCSSSvg from '@/assets/skills/Tailwind CSS.svg'
import TypeScriptSvg from '@/assets/skills/TypeScript.svg'
import VisualStudioCodeSvg from '@/assets/skills/Visual Studio Code (VS Code).svg'
import VitejsSvg from '@/assets/skills/Vite.js.svg'
import VuejsSvg from '@/assets/skills/Vue.js.svg'
import WebStormSvg from '@/assets/skills/WebStorm.svg'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

export interface Skill {
  name: string
  icon: StaticImport
}

export const skills: Skill[] = [
  {
    name: 'Ant Design',
    icon: AntDesignSvg,
  },
  {
    name: 'Axios',
    icon: AxiosSvg,
  },
  {
    name: 'CSS3',
    icon: CSS3Svg,
  },
  {
    name: 'Electron',
    icon: ElectronSvg,
  },
  {
    name: 'HTML5',
    icon: HTML5Svg,
  },
  {
    name: 'JavaScript',
    icon: JavaScriptSvg,
  },
  {
    name: 'jQuery',
    icon: jQuerySvg,
  },
  {
    name: 'JSON',
    icon: JSONSvg,
  },
  {
    name: 'Jupyter',
    icon: JupyterSvg,
  },
  {
    name: 'Nest.js',
    icon: NestjsSvg,
  },
  {
    name: 'Next.js',
    icon: NextjsSvg,
  },
  {
    name: 'Node.js',
    icon: NodejsSvg,
  },
  {
    name: 'PyCharm',
    icon: PyCharmSvg,
  },
  {
    name: 'Python',
    icon: PythonSvg,
  },
  {
    name: 'Python Poetry',
    icon: PythonPoetrySvg,
  },
  {
    name: 'React',
    icon: ReactSvg,
  },
  {
    name: 'Redux',
    icon: ReduxSvg,
  },
  {
    name: 'Rollup.js',
    icon: RollupjsSvg,
  },
  {
    name: 'Sass',
    icon: SassSvg,
  },
  {
    name: 'Sequelize',
    icon: SequelizeSvg,
  },
  {
    name: 'TailwindCSS',
    icon: TailwindCSSSvg,
  },
  {
    name: 'TypeScript',
    icon: TypeScriptSvg,
  },
  {
    name: 'Visual Studio Code',
    icon: VisualStudioCodeSvg,
  },
  {
    name: 'Vite.js',
    icon: VitejsSvg,
  },
  {
    name: 'Vuejs',
    icon: VuejsSvg,
  },
  {
    name: 'WebStorm',
    icon: WebStormSvg,
  },
]

const skillMap = Object.fromEntries(skills.map((e) => [e.name, e]))

export interface SkillGroupItem {
  name: string
  skills: Skill[]
}

export const skillGroup: SkillGroupItem[] = [
  {
    name: '语言',
    skills: [skillMap.TypeScript, skillMap.JavaScript, skillMap.Python, skillMap.HTML5, skillMap.CSS3],
  },
  {
    name: '框架',
    skills: [
      skillMap['Next.js'],
      skillMap.React,
      skillMap.Vuejs,
      skillMap.TailwindCSS,
      skillMap.Sequelize,
      skillMap['Nest.js'],
      skillMap.Electron,
      skillMap['Rollup.js'],
    ],
  },
  {
    name: '编辑器',
    skills: [skillMap.WebStorm, skillMap['Visual Studio Code'], skillMap.PyCharm],
  },
]
