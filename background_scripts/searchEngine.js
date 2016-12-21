/**
 * Created by erictsangx on 19/12/2016.
 */
import { loadOptions, createTab, TEXT_TYPE, IMAGE_TYPE, LINK_TYPE } from '../lang';

export default ({ type, content, distance }) => {
  loadOptions().then((options) => {
    if (distance >= options.threshold) {
      switch (type) {
        case IMAGE_TYPE:
          createTab({
            url: content,
            active: options.imageActive,
          });
          break;
        case LINK_TYPE:
          createTab({
            url: content,
            active: options.linkActive,
          });
          break;
        case TEXT_TYPE:
          createTab({
            url: `http://www.google.com/search?q=${content}`,
            active: options.textActive,
          });
          break;
        default:
          console.error('should not happen');
      }
    }
  });
};
