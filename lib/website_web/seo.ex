defmodule WebsiteWeb.SEO do
  @moduledoc """
  SEO configuration for the website.
  """
  use WebsiteWeb, :verified_routes

  use SEO,
    site: &__MODULE__.site_config/1,
    open_graph: &__MODULE__.open_graph_config/1

  @doc """
  Configures the Open Graph.
  """
  def open_graph_config(conn) do
    SEO.OpenGraph.build(
      title: conn.assigns.page_title,
      description: "Personal website and blog of Kenneth Kostrešević, an elixir developer.",
      locale: "en_US",
      url: conn.assigns.current_url
    )
  end

  @doc """
  Configures the site.
  """
  def site_config(conn) do
    SEO.Site.build(
      canonical_url: conn.assigns.current_url,
      description: "Personal website and blog of Kenneth Kostrešević, an elixir developer."
    )
  end
end
