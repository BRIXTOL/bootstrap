import { rollup, plugin, env } from '@brixtol/rollup-config';
import sass from 'sass';

export default rollup(
  {
    input: {
      grid: 'index.scss'
    },
    output: {
      dir: 'test'
    },
    plugins: env.if('dev')(
      [
        plugin.copy(
          {
            copyOnce: env.watch,
            targets: [
              {
                src: 'node_modules/bootstrap/scss/*',
                dest: 'sass/bootstrap'
              }
            ]
          }
        ),
        plugin.postcss(
          {
            extract: true,
            use: { sass }
          }
        )
      ]
    )(
      [
        plugin.terser(
          {
            compress: {
              passes: 2
            }
          }
        )
      ]
    )
  }
);
