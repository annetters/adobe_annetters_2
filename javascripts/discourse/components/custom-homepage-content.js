import Component from "@ember/component";
import { action } from "@ember/object";
import { service } from "@ember/service";
import { defaultHomepage } from "discourse/lib/utilities";

export default class CustomHomepageContent extends Component {
    @service site;
    @service router;

    // Checks router for route name. If matches homepage, then return true.
    get isHomepage() {
        const { currentRouteName } = this.router;
        return currentRouteName === `discovery.${defaultHomepage()}`;
    }
}