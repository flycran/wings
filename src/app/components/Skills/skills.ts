import { StaticImport } from 'next/dist/shared/lib/get-img-props'
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

export interface Skill {
  name: string
  icon: StaticImport
}

export const skills: Skill[] = [
  {
    title: 'Ant Design',
    icon: AntDesignSvg,
  },
  {
    title: 'Axios',
    icon: AxiosSvg,
  },
  {
    title: 'CSS3',
    icon: CSS3Svg,
  },
  {
    title: 'Electron',
    icon: ElectronSvg,
  },
  {
    title: 'HTML5',
    icon: HTML5Svg,
  },
  {
    title: 'JavaScript',
    icon: JavaScriptSvg,
  },
  {
    title: 'jQuery',
    icon: jQuerySvg,
  },
  {
    title: 'JSON',
    icon: JSONSvg,
  },
  {
    title: 'Jupyter',
    icon: JupyterSvg,
  },
  {
    title: 'Nest.js',
    icon: NestjsSvg,
  },
  {
    title: 'Next.js',
    icon: NextjsSvg,
  },
  {
    title: 'Node.js',
    icon: NodejsSvg,
  },
  {
    title: 'PyCharm',
    icon: PyCharmSvg,
  },
  {
    title: 'Python',
    icon: PythonSvg,
  },
  {
    title: 'Python Poetry',
    icon: PythonPoetrySvg,
  },
  {
    title: 'React',
    icon: ReactSvg,
  },
  {
    title: 'Redux',
    icon: ReduxSvg,
  },
  {
    title: 'Rollup.js',
    icon: RollupjsSvg,
  },
  {
    title: 'Sass',
    icon: SassSvg,
  },
  {
    title: 'Sequelize',
    icon: SequelizeSvg,
  },
  {
    title: 'TailwindCSS',
    icon: TailwindCSSSvg,
  },
  {
    title: 'TypeScript',
    icon: TypeScriptSvg,
  },
  {
    title: 'Visual Studio Code',
    icon: VisualStudioCodeSvg,
  },
  {
    title: 'Vite.js',
    icon: VitejsSvg,
  },
  {
    title: 'Vuejs',
    icon: VuejsSvg,
  },
  {
    title: 'WebStorm',
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
    title: '语言',
    skills: [skillMap['TypeScript'], skillMap['JavaScript'], skillMap['Python'], skillMap['HTML5'], skillMap['CSS3']],
  },
  {
    title: '框架',
    skills: [
      skillMap['Next.js'],
      skillMap['React'],
      skillMap['Vuejs'],
      skillMap['TailwindCSS'],
      skillMap['Sequelize'],
      skillMap['Nest.js'],
      skillMap['Electron'],
      skillMap['Rollup.js'],
    ],
  },
  {
    title: '编辑器',
    skills: [skillMap['WebStorm'], skillMap['Visual Studio Code'], skillMap['PyCharm']],
  },
]
