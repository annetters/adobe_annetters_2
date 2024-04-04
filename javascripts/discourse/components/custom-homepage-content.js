import Component from "@glimmer/component";
import { defaultHomepage } from "discourse/lib/utilities";
import { service } from "@ember/service";

export default class CustomHomepageContent extends Component {
  @service router;
  @service site;

  // Checks router for route name. If matches homepage, then return true.
  get isHomepage() {
    const { currentRouteName } = this.router;
    return currentRouteName === `discovery.${defaultHomepage()}`;
  }

}