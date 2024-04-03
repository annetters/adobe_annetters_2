import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { defaultHomepage } from "discourse/lib/utilities";

export default class CustomHomepageContent extends Component {
  @service router;

  // Checks router for route name. If matches homepage, then return true.
  get isHomepage() {
    const { currentRouteName } = this.router;
    return currentRouteName === `discovery.${defaultHomepage()}`;
  }

  tagName: "",
  showMuted: false,

  @discourseComputed("showMutedCategories", "filteredCategories.length")
  mutedToggleIcon(showMutedCategories, filteredCategoriesLength) {
    if (filteredCategoriesLength === 0) {
      return;
    }

    if (showMutedCategories) {
      return "minus";
    }

    return "plus";
  },

  @discourseComputed("showMuted", "filteredCategories.length")
  showMutedCategories(showMuted, filteredCategoriesLength) {
    return showMuted || filteredCategoriesLength === 0;
  },

  @discourseComputed("categories", "categories.length")
  filteredCategories(categories, categoriesLength) {
    if (!categories || categoriesLength === 0) {
      return [];
    }

    return categories.filter((cat) => !cat.isHidden);
  },

  @discourseComputed("categories", "categories.length")
  mutedCategories(categories, categoriesLength) {
    if (!categories || categoriesLength === 0) {
      return [];
    }

    // hide in single category pages
    if (categories.firstObject.parent_category_id) {
      return [];
    }

    return categories.filterBy("hasMuted");
  },

  @action
  toggleShowMuted(event) {
    event?.preventDefault();
    this.toggleProperty("showMuted");
  }
}