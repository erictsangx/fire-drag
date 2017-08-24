/**
 * Created by erictsangx on 19/12/2016.
 */
import { loadOptions, createTab, engineList } from '../addon/core/lang';
import { TEXT_TYPE, IMAGE_TYPE, LINK_TYPE } from '../addon/core/constants';


function submitSearch(value, query) {
  const engine = engineList.find((item) => {
    return item.value === value;
  });
  return encodeURI(engine.url.replace('@@', query));
}

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
            url: submitSearch(options.defaultSearch, content),
            active: options.textActive,
          });
          break;
        default:
          console.error('should not happen');
      }
    }
  });
};
