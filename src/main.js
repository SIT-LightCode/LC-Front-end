import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import './style.css'


// createApp(App).use(createPinia()).mount('#app')
// createApp(App).use(router).mount('#app')


import VMdEditor from '@kangc/v-md-editor/lib/codemirror-editor';
import '@kangc/v-md-editor/lib/style/codemirror-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// Resources for the codemirror editor
import Codemirror from 'codemirror';
// mode
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/vue/vue';
// edit
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/matchbrackets';
// placeholder
import 'codemirror/addon/display/placeholder';
// active-line
import 'codemirror/addon/selection/active-line';
// scrollbar
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/scroll/simplescrollbars.css';
// style
import 'codemirror/lib/codemirror.css';
// languages
import enUS from '@kangc/v-md-editor/lib/lang/en-US';



import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';

// highlightjs
import hljs from 'highlight.js';



import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';



VMdPreview.use(githubTheme, {
  Hljs: hljs,
});


VMdEditor.Codemirror = Codemirror;

VMdEditor.use(githubTheme);


VMdEditor.lang.use('en-US', enUS);


const app = createApp(App)
app.use(router)
app.use(createPinia())

app.use(VMdEditor);
app.use(VMdPreview);

app.use(LoadingPlugin);

app.mount('#app')





