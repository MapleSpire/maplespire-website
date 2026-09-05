FROM debian:bookworm-slim AS vmaf-builder

ARG VMAF_VERSION=v3.1.0
ARG VMAF_COMMIT=6375a4be62fd2673bba2c356b26867d8af01a685

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        build-essential ca-certificates git meson nasm ninja-build pkg-config python3 xxd \
    && rm -rf /var/lib/apt/lists/*

RUN git clone --depth 1 --branch "${VMAF_VERSION}" https://github.com/Netflix/vmaf.git /src/vmaf \
    && test "$(git -C /src/vmaf rev-parse HEAD)" = "${VMAF_COMMIT}"

WORKDIR /src/vmaf/libvmaf
RUN meson setup build --buildtype release \
    && ninja -C build \
    && DESTDIR=/opt/vmaf ninja -C build install

# Even-numbered releases only: odd Node lines get six months of support and are
# already out of maintenance by the time they are the newest tag.
FROM node:26-bookworm-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends ffmpeg ca-certificates \
    && rm -rf /var/lib/apt/lists/*

COPY --from=vmaf-builder /opt/vmaf/usr/local/ /usr/local/
RUN ldconfig \
    && vmaf --version \
    && ffmpeg -hide_banner -filters 2>/dev/null | grep -q " ssim "

WORKDIR /work/website
ENTRYPOINT ["node"]
