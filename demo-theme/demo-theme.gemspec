# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "demo-theme"
  spec.version       = "0.1.0"
  spec.authors       = ["bigelowcc"]
  spec.email         = ["liam@cloudcannon.com"]

  spec.summary       = "Empty Summary"
  spec.homepage      = "https://cloudcannon.com"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README|_config\.yml)!i) }

  spec.add_runtime_dependency "jekyll", "~> 4.1"
end
